CREATE TABLE
    Users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        no_telp VARCHAR(20),
        alamat TEXT
    );

CREATE TABLE
    Products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        stock INT NOT NULL,
        description TEXT
    );

CREATE TABLE
    Carts (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users (id),
        FOREIGN KEY (product_id) REFERENCES Products (id)
    );

CREATE TABLE
    Orders (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        cart_id VARCHAR(255) NOT NULL,
        total_price INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users (id) FOREIGN KEY (cart_id) REFERENCES Carts (id)
    );

CREATE TABLE
    Forums (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users (id)
    );

CREATE TABLE
    Comments (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        forum_id VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users (id),
        FOREIGN KEY (forum_id) REFERENCES Forums (id)
    );

CREATE TABLE
    Saved (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        forum_id VARCHAR(255) NOT NULL,
        status BOOLEAN NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users (id),
        FOREIGN KEY (forum_id) REFERENCES Forums (id)
    );

CREATE TABLE
    Likes (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        forum_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users (id),
        FOREIGN KEY (forum_id) REFERENCES Forums (id)
    );