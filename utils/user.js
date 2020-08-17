var users=[];
addUser=({id,username,roomno})=>{
	var username=username.trim().toLowerCase();
	var roomno=roomno.trim().toLowerCase();
	if(!username||!roomno)
	{
		return {error:'both username and room number required'};
	}
	const exists=users.find((user)=>{
		return user.username==username&&user.roomno==roomno;
	})
	if(exists)
	{
		return {error:'username exists'};
	}
	const User={id,username,roomno};
	users.push(User);
	return {User};
}

getUsersInRoom=(roomno)=>{
	const usersjoined=users.filter((users)=>{
		return users.roomno==roomno;
	})

	return usersjoined;
}

getUser=(id)=>{
	const user=users.find((users)=>{
		return users.id==id;
	})
	return user;
}

removeUser=(id)=>{
	const user=users.findIndex((users)=>{
		return users.id==id;
	})
	console.log(user);
	if(user!=-1)
	{
		return users.splice(user,1)[0];
	}
}

module.exports={
	addUser,
	getUsersInRoom,
	getUser,
	removeUser
};
