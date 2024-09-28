import { useState } from "react";
import { Layout, Menu, Calendar, List, Avatar, Badge } from "antd";

const { Header, Content } = Layout;

// Mock data for bookings
const mockBookings = {
  "2024-09-28": [
    { name: "Alice Johnson", position: 1 },
    { name: "Bob Smith", position: 2 },
    { name: "Charlie Brown", position: 3 },
  ],
  "2024-09-29": [
    { name: "David Lee", position: 1 },
    { name: "Emma Watson", position: 2 },
  ],
};

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const onSelect = (newValue) => {
    setSelectedDate(newValue.format("YYYY-MM-DD"));
  };

  const dateCellRender = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const bookingsForDate = mockBookings[dateString];
    if (bookingsForDate) {
      return (
        <Badge
          count={bookingsForDate.length}
          className="site-badge-count-4"
          style={{ backgroundColor: "#52c41a" }}
        />
      );
    }
    return null;
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Dashboard</div>
          <Menu mode="horizontal" className="border-b-0">
            {/* <Menu.Item key="1">Home</Menu.Item> */}
            <Menu.Item key="1">Bookings</Menu.Item>
            <Menu.Item key="2">Profile</Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content className="p-6">
        <div className="max-w-4xl mx-auto">
          <Calendar
            onSelect={onSelect}
            dateCellRender={dateCellRender}
            className="bg-white p-4 rounded-lg shadow-sm mb-6"
          />
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Bookings for {selectedDate}
            </h2>
            <List
              itemLayout="horizontal"
              dataSource={mockBookings[selectedDate] || []}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{item.name[0]}</Avatar>}
                    title={item.name}
                    description={`Queue Position: ${item.position}`}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
