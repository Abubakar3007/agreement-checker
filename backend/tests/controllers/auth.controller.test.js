const { register } = require('../../controllers/auth.controller');
const User = require('../../model/User');

// Mock the User model
jest.mock('../../model/User');

describe('Auth Controller - register', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    /**
     * @test Happy Path: Successfully registers a new user
     */
    it('should register a new user successfully', async () => {
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({
            _id: 'mockId',
            fullName: 'John Doe',
            email: 'john@example.com'
        });

        await register(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
        expect(User.create).toHaveBeenCalledWith({
            fullName: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'User registered successfully',
            user: {
                id: 'mockId',
                fullName: 'John Doe',
                email: 'john@example.com'
            }
        });
    });

    /**
     * @test Input Verification: Missing fullName
     */
    it('should return 400 if fullName is missing', async () => {
        delete req.body.fullName;

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });

    /**
     * @test Input Verification: Missing email
     */
    it('should return 400 if email is missing', async () => {
        delete req.body.email;

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });

    /**
     * @test Input Verification: Missing password
     */
    it('should return 400 if password is missing', async () => {
        delete req.body.password;

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });

    /**
     * @test Conflict: Email already registered
     */
    it('should return 409 if email already exists', async () => {
        User.findOne.mockResolvedValue({ email: 'john@example.com' });

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email already registered' });
    });

    /**
     * @test Exception Handling: Server error
     */
    it('should return 500 if an error occurs', async () => {
        User.findOne.mockRejectedValue(new Error('Database error'));

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    });
});
