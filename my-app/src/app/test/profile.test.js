const { add, subtract } = require('../maths');
import { runDBCallAsync } from '../signup/page';


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
    let name = "TestName";
    let email = "TestEmail@gmail.com";
    let pass = "pass";
    let confirmPass = "pass";
    const result = await runDBCallAsync(`http://localhost:3000/api/newregister?name=${name}&email=${email}&pass=${pass}&confirmPass=${confirmPass}`)
    expect(result).equals("valid")
});
