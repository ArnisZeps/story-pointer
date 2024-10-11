db.createUser(
    {
        user: "admin",
        pwd: "option123",
        roles: [
            {
                role: "readWrite",
                db: "estimates"
            }
        ]
    }
);