const resolveChannel = async function(search, guild){
    let channel = null;
    if(!search || typeof search !== "string") return;
    //Try to search using ID
    if(search.match(/^#&!?(\d+)$/)){
        let id = search.match(/^#&!?(\d+)$/)[1];
        channel = guild.channels.cache.get(id);
        if(channel) return channel;
    }
    //Got fucking lazy so I just removed the <#>
    if(search.includes("<#")){
        let firstChannel = search.replace("<#", "");
        let channelID = firstChannel.replace(">", "");
        let channel = guild.channels.cache.get(channelID);
        return channelID;
    }
    //Try to search it using name
    channel = guild.channels.cache.find((c) => search.toLowerCase() === c.name.toLowerCase());
    if(channel) return channel;
    //Try to find the channel itself
    channel = guild.channels.cache.get(search);
    return channel;
};

const resolveMember = async ({ message, search, useMessageContent = true }) => {
	const contentToCheck = search || (useMessageContent ? message.content : null);
	if (!contentToCheck || typeof contentToCheck !== "string") return;
	// Try by parsing the search
	if (contentToCheck.match(/^<@!?(\d+)>$/)) {
		const [, userID] = contentToCheck.match(/^<@!?(\d+)>$/);
		const memberFound = await message.guild.members.fetch(userID).catch(() => {});
		if (memberFound)
			return memberFound;
	}
	// Try with ID
	if (await message.guild.members.fetch(search).catch(() => {})) {
		const memberFound = await message.guild.members.fetch(search);
		if (memberFound)
			return memberFound;
	}
	// Try with name with @
	await message.guild.members.fetch({
		query: search
	});
	if (
		message.guild.members.cache.some(
			member => member.user.tag === search || member.user.username === search
		)
	) {
		const memberFound = message.guild.members.cache.find(
			member => member.user.tag === search || member.user.username === search
		);
		if (memberFound)
			return memberFound;
	}
	return;
};

const resolveRole = async ({ message, search }) => {
	const contentToCheck = search || message.content;
	if (!contentToCheck || typeof contentToCheck !== "string") return;
	// Try by parsing the search
	if (contentToCheck.match(/^<@&([0-9]{18})>/)) {
		const [, roleID] = contentToCheck.match(/^<@&([0-9]{18})>/);
		const roleFound = message.guild.roles.cache.get(roleID);
		if (roleFound)
			return roleFound;
	}
	// Try with ID
	if (message.guild.roles.cache.has(search)) {
		const roleFound = message.guild.roles.cache.get(search);
		if (roleFound)
			return roleFound;
	}
	// Try with name with @
	if (
		message.guild.roles.cache.some(
			role => `@${role.name}` === search || role.name === search
		)
	) {
		const roleFound = message.guild.roles.cache.find(
			role => `@${role.name}` === search || role.name === search
		);
		if (roleFound)
			return roleFound;
	}
	return;
};

module.exports = {
	resolveChannel,
	resolveMember,
	resolveRole
};