import { Meta, StoryObj } from "@storybook/react";
import Calendar from "./components/calendar";

const meta: Meta<typeof Calendar> = {
  component: Calendar
};

export default meta;

export const Default: StoryObj<typeof Calendar> = {
  render: () => <Calendar />
};
