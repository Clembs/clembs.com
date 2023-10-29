export type HabileChatData = {
	tokens: number;
	used: number;
	messagesSent: number;
	knowledge: string;
	dismissedUsageBanner: boolean;
	lastMessages: {
		id: string;
		userId: string;
		content: string;
	}[];
};

export const defaultHabileChatData: HabileChatData = {
	tokens: 0.8,
	used: 0,
	messagesSent: 0,
	knowledge: '',
	dismissedUsageBanner: false,
	lastMessages: [],
};
