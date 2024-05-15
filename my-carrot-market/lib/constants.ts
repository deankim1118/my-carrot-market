export const PASSWORD_MIN_LENTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@&^&*])[A-Za-z\d#?!@&^&*]{6,}$/
);
