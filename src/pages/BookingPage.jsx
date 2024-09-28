import React, { useState, useEffect } from "react";
import {
  DatePicker,
  Button,
  List,
  message,
  Modal,
  Card,
  Layout,
  Menu,
} from "antd";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import axios from "axios";

const { Header } = Layout;

const API_BASE_URL = "http://localhost:3000"; // Adjust this to match your API URL

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [currentUserBooking, setCurrentUserBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    if (selectedDate) {
      fetchBookings(selectedDate);
    }
  }, [selectedDate]);

  const fetchBookings = async (date) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/bookings/${date.format("YYYY-MM-DD")}`,
      );
      setBookings(response.data);
      updateCurrentUserBooking(response.data);
    } catch (error) {
      message.error("Failed to fetch bookings");
    }
    setLoading(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const updateCurrentUserBooking = (bookingsData) => {
    const userBooking = bookingsData.find(
      (booking) => booking.name === user.name,
    );
    setCurrentUserBooking(userBooking || null);
  };

  const handleBookLeave = async () => {
    if (!selectedDate) {
      message.error("Please select a date first");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/book-leave`, {
        name: user.name,
        date: selectedDate.format("YYYY-MM-DD"),
      });
      message.success("Leave booked successfully");
      fetchBookings(selectedDate);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.error);
      } else {
        message.error("Failed to book leave");
      }
    }
    setLoading(false);
  };

  const handleCancelBooking = () => {
    setIsModalVisible(true);
  };

  const confirmCancelBooking = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/cancel-leave`, {
        name: user.name,
        date: selectedDate.format("YYYY-MM-DD"),
      });
      message.success("Booking cancelled successfully");
      fetchBookings(selectedDate);
    } catch (error) {
      message.error("Failed to cancel booking");
    }
    setLoading(false);
    setIsModalVisible(false);
  };

  const renderBookings = () => {
    if (!selectedDate) return null;

    return (
      <Card className="mt-6">
        <h2 className="text-lg font-semibold mb-4">
          Bookings for {selectedDate.format("YYYY-MM-DD")}
        </h2>
        <List
          loading={loading}
          dataSource={bookings}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.name}
                description={`Booking Number: ${item.bookingNumber}`}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            Welcome {user?.name || "User"}
          </div>
          <Menu mode="horizontal" className="border-b-0">
            <Menu.Item key="1">Profile</Menu.Item>
          </Menu>
        </div>
      </Header>
      <div className="w-2/4 mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Book Your Leave</h1>
        <div className="flex items-center space-x-4 mb-6">
          <DatePicker onChange={handleDateChange} className="flex-grow" />
          {currentUserBooking ? (
            <Button
              onClick={handleCancelBooking}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              loading={loading}
            >
              Cancel Booking
            </Button>
          ) : (
            <Button
              onClick={handleBookLeave}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-300"
              loading={loading}
            >
              Book Leave
            </Button>
          )}
        </div>
        {currentUserBooking && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <p className="text-blue-800">
              You have a booking (Number: {currentUserBooking.bookingNumber})
              for {selectedDate?.format("YYYY-MM-DD")}
            </p>
          </Card>
        )}
        {renderBookings()}
      </div>

      <Modal
        title="Cancel Booking"
        open={isModalVisible}
        onOk={confirmCancelBooking}
        onCancel={() => setIsModalVisible(false)}
        closeIcon={<X className="h-4 w-4 text-gray-500" />}
        className="font-sans"
        okText="Confirm"
        cancelText="Back"
        okButtonProps={{
          className: "bg-red-500 hover:bg-red-600 border-red-500 text-white",
          loading: loading,
        }}
        cancelButtonProps={{
          className: "border-gray-300 text-gray-700",
          disabled: loading,
        }}
      >
        <p className="text-gray-600">
          Are you sure you want to cancel your booking?
        </p>
        <p className="text-gray-600">This action cannot be undone.</p>
      </Modal>
    </Layout>
  );
};

export default BookingPage;
