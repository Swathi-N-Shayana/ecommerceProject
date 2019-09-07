var ex= require('express');
var fs=require('fs');

fs.readFile('push.json', 'utf8',function(err, fileContent) {
console.log(fileContent);
var user = JSON.parse(fileContent)
user.push({email:"swathi1111",pwd:"23456y7u"});		
console.log(user);
console.log(fileContent.email)

fs.writeFile('push.json', JSON.stringify(user),(err)=>
{
	if(err)
	{
		console.log(err);
	}
}) 


})