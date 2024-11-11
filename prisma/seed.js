const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // เพิ่มข้อมูลตัวอย่างในตาราง locations
  const location1 = await prisma.locations.create({
    data: {
      name: "Main Office",
      address: "123 Main St, City, Country",
      updated_at: new Date(), // เพิ่มค่า updated_at เป็น Date ที่ปัจจุบัน
    },
  });
  console.log("Location created: ", location1);

  // เพิ่มข้อมูลตัวอย่างในตาราง responsibles
  const responsible1 = await prisma.responsibles.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      updated_at: new Date(), // เพิ่มค่า updated_at เป็น Date ที่ปัจจุบัน
    },
  });
  console.log("Responsible created: ", responsible1);

  // เพิ่มข้อมูลตัวอย่างในตาราง users
  const user1 = await prisma.users.create({
    data: {
      email: 'user1@example.com',
      password: 'password123', // ควรเข้ารหัสรหัสผ่านจริงๆ แต่ในที่นี้ใช้รหัสผ่านแบบ plaintext
      firstname: 'Teerawat',
      lastname: 'Nppo',
      phone: '09929297356',
      role: 'USER',
      location_id: location1.id, // เชื่อมโยงกับ location1
    },
  });
  console.log("User created: ", user1);

  // เพิ่มข้อมูลตัวอย่างในตาราง reports
  const report1 = await prisma.reports.create({
    data: {
      user_id: user1.id,
      responsible_id: responsible1.id,
      title: 'Broken Laptop',
      description: 'Laptop is not turning on',
      status: 'PENDING',
      category: 'Hardware Issue',
      location_id: location1.id,
      imageUrl: 'https://example.com/laptop.jpg',
    },
  });
  console.log("Report created: ", report1);

  // เพิ่มข้อมูลตัวอย่างในตาราง calendar_events
  const event1 = await prisma.calendar_events.create({
    data: {
      title: 'Office Maintenance',
      description: 'Scheduled maintenance for the office network.',
      start_date: new Date('2024-11-01T10:00:00'),
      end_date: new Date('2024-11-01T12:00:00'),
      location_id: location1.id, // เชื่อมโยงกับสถานที่
    },
  });
  console.log("Calendar event created: ", event1);

  console.log('Seed data inserted successfully!');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
