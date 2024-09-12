interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
}

function isLegal(user: User): boolean {
    return user.age > 18
}

const testUser: User = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'securePassword123',
    age: 20
};

console.log(isLegal(testUser));

