import { Collection } from "mongodb";

export function startRevenuePerHourHandler(users: Collection) {
  // Run every hour
  setInterval(async () => {
    try {
      console.log("⏳ Adding passive revenue to businesses...");

      // Get all users
      const allUsers = await users.find({}).toArray();

      for (const user of allUsers) {
        let updatedBusinesses = user.businesses.map((biz: any) => {
          return {
            ...biz,
            //add employee + equipment later
            balance:
              (biz.balance || 0) +
              (biz.revenue || 0) +
              (biz.employeeBoost || 0) +
              (biz.equipmentBoost || 0), // add hourly revenue
            lastCollect: new Date(),
          };
        });

        await users.updateOne(
          { _id: user._id },
          { $set: { businesses: updatedBusinesses } }
        );
      }

      console.log("✅ Passive revenue added to all businesses.");
    } catch (err) {
      console.error("❌ Error in revenue job:", err);
    }
  }, 1000 * 60 * 60); // every 1 hour
}
