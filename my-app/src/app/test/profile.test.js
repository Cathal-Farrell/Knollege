const { add, subtract } = require('../maths');
import { runDBCallAsync as createAccount} from '../signup/page';
import { runDBCallAsync as loginAccount } from '../login/page';

beforeAll(() => {
  // Mock window object
  global.window = {
    location: jest.fn(),
    confirm: jest.fn(),
    localStorage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
  };
});

afterAll(() => {
  delete global.window;
});

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('subtracts 5 - 2 to equal 3', () => {
  expect(subtract(5, 2)).toBe(3);
});

test('subtracts 5 - 2 to equal 3', () => {
  expect(subtract(5, 2)).toBe(3);
});

test('adding a new user', async () => {
    const name = "TestName";
    const email = "TestEmail@gmail.com";
    const pass = "pass";
    const confirmPass = "pass";
    const setOpenInvalid = jest.fn();
    const setOpenIncomplete = jest.fn();
    const setOpenInconsistent = jest.fn();
      
    // Check console print
    const consoleSpy = jest.spyOn(console, 'log');

    const result = await createAccount(
        `http://localhost:3000/api/newregister?name=${name}&email=${email}&pass=${pass}&confirmPass=${confirmPass}`,
        setOpenInvalid,
        setOpenIncomplete,
        setOpenInconsistent
    )
    
    expect(consoleSpy).toHaveBeenCalledWith("login is valid!");
    consoleSpy.mockRestore();
});

test('logging in', async () => {

    // Mock alert
    global.alert = jest.fn();

    const email = "TestEmail@gmail.com";
    const pass = "pass";
    const setOpen = jest.fn();

    const consoleSpy = jest.spyOn(console, 'log');

    const result = await loginAccount(`http://localhost:3000/api/login?email=${email}&pass=${pass}`, setOpen)

    expect(consoleSpy).toHaveBeenCalledWith("login valid");
    consoleSpy.mockRestore();
})

test('deleting user', async () => {

    const email = "TestEmail@gmail.com";
    const pass = "pass";

    const result = await fetch(`http://localhost:3000/api/deleteUser?email=${email}&pass=${pass}`);

    const data = await result.json();
    expect(data.data).toBe("true")
})
