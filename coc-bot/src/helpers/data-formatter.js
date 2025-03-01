function roleFormatter(role) {
    switch (role) {
        case 'admin':
            return 'Elder';
        case 'coLeader':
            return 'Co-Leader';
        case 'leader':
            return 'Leader';
        case 'member':
            return 'Member';
        default:
            return 'User';
    }
}

function memberNameExtractor(data) {
    let memberNameList = [];
    for (let i = 0; i < data.length; i++) {
        memberNameList.push(data[i].name);
    }
    return memberNameList;
}

function discordLookup(memberList) {
    for (let member in memberList) {
	console.log(member)
    }
}

export { discordLookup, memberNameExtractor, roleFormatter }
