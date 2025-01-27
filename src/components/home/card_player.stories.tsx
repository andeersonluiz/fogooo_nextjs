import type { Meta, StoryObj } from "@storybook/react";

import CardPlayer from "./tile/card_player_tile";

const meta = {
  component: CardPlayer,
} satisfies Meta<typeof CardPlayer>;

export default meta;

type Story = StoryObj<typeof meta>;
