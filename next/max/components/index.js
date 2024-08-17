function isLegal(user) {
    return user.age > 18;
}
var testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'securePassword123',
    age: 20
};
console.log(isLegal(testUser));


const a =['hi', 1, 3, true]
console.log(a)