import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { BusinessCommandContext } from "../../types/context/BusinessCommandContext.js";

export const all = async (
  interaction: ChatInputCommandInteraction,
  context: BusinessCommandContext
) => {
  const { user, BusinessData } = context;

  // Owned businesses
  const ownedList =
    user.businesses.length > 0
      ? user.businesses
          .map(
            (b: any, i: number) => `${i + 1}. **${b.type}** (💰 $${b.balance})`
          )
          .join("\n")
      : "You don’t own any businesses yet!";

  // Optional: show unowned businesses with unlock cost
  const unownedList = Object.keys(BusinessData.unlocks)
    .filter((type) => !user.businesses.some((b: any) => b.type === type))
    .map((type) => `• **${type}** (Unlock: $${BusinessData.unlocks[type]})`)
    .join("\n");

  const description = `${ownedList}${
    unownedList ? "\n\nAvailable to unlock:\n" + unownedList : ""
  }`;

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("📋 All Businesses")
        .setDescription(description)
        .setColor(0x3498db),
    ],
  });
};
