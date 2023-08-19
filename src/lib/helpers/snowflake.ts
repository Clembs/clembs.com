import { Snowflake } from '@sapphire/snowflake';
import { snowflakeToDate as purpletSnowflakeToDate } from '@purplet/utils';

const epoch = new Date('2023-01-01T00:00:00.000Z');

export const snowflake = new Snowflake(epoch);

export const generateSnowflake = () => snowflake.generate().toString();

export const snowflakeToDate = (snowflake: string | bigint) =>
	purpletSnowflakeToDate(snowflake, epoch.getTime());
