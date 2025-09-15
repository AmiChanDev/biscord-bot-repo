import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { CommandContext } from "../../types/CommandContext.js";
import { EmployeeData } from "../../models/EmployeeData.js";

export const hire = async (
  interaction: ChatInputCommandInteraction,
  context: CommandContext
) => {
  const { user, users } = context;
  const roleName = interaction.options.getString("role", true);

  // Active business
  const activeBusiness = user.businesses.find(
    (b) => b.id === user.activeBusinessId
  );
  if (!activeBusiness) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ No Active Business")
          .setDescription("Select an active business first!")
          .setColor(0xff0000),
      ],
    });
  }

  if (!activeBusiness.hiredEmployees) activeBusiness.hiredEmployees = [];

  const employees = EmployeeData[activeBusiness.type];
  if (!employees) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Invalid Business Type")
          .setDescription("No employees found for this business type.")
          .setColor(0xff0000),
      ],
    });
  }

  const employee = employees.find((e) => e.role === roleName);
  if (!employee) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Invalid Employee")
          .setDescription("That employee does not exist for this business.")
          .setColor(0xff0000),
      ],
    });
  }

  // Check if this role is already hired
  if (activeBusiness.hiredEmployees.some((e) => e.role === employee.role)) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Role Already Hired")
          .setDescription(`You have already hired a **${employee.role}**.`)
          .setColor(0xffa500),
      ],
    });
  }

  // Check balance
  if (activeBusiness.balance < employee.salary) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⚠️ Insufficient Balance")
          .setDescription(
            `You need **$${employee.salary}** to hire **${employee.role}**, but your business only has **$${activeBusiness.balance}**.`
          )
          .setColor(0xffa500),
      ],
    });
  }

  // Deduct salary from balance
  activeBusiness.balance -= employee.salary;

  // Hire
  activeBusiness.hiredEmployees.push(employee);
  activeBusiness.employeeBoost += employee.boost;

  await users.updateOne(
    { userId: user.userId, "businesses.id": activeBusiness.id },
    { $set: { "businesses.$": activeBusiness } }
  );

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("👥 Employee Hired")
        .setDescription(`You successfully hired **${employee.role}**!`)
        .addFields(
          { name: "Revenue Boost", value: `💰 +${employee.boost}` },
          {
            name: "Total Employees",
            value: `🏢 ${activeBusiness.hiredEmployees.length}`,
          }
        )
        .setColor(0x2ecc71),
    ],
  });
};
