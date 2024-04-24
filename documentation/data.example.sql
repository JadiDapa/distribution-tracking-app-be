insert into
    user (name, email, noTelp, alamat)
values
    (
        'John Doe',
        'JohnDoe@gmail.com',
        '081234567890',
        'Jl. Jendral Sudirman No. 1'
    );

insert into
    product (name, price, stock, description)
values
    (
        'Laptop Asus ROG',
        15000000,
        10,
        'Laptop gaming terbaik'
    );

insert into
    product (name, price, stock, description)
values
    (
        'Laptop Lenovo Ideapad',
        8000000,
        5,
        'Laptop untuk kerja'
    );

insert into
    product (name, price, stock, description)
values
    (
        'Laptop HP Pavilion',
        10000000,
        7,
        'Laptop untuk kerja'
    );

insert into
    cart (userId, productId, quantity)
values
    ('1', '1', 1);

insert into
    cart (userId, productId, quantity)
values
    ('1', '2', 2);

insert into
    cart (userId, productId, quantity)
values
    ('1', '3', 1);