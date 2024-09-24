export const totalItems = (x) => {
  return x.reduce((sum, product) => sum + product.quantity, 0);
};

export const totalPrice = (x) => {
  return x.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
};

export default function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.product];
    case "remove":
      return state.filter((p) => p.id !== action.id);
    case "increase":
      const IndexI = state.findIndex((p) => p.id === action.id);
      state[IndexI].quantity += 1;
      return [...state];
    case "decrease":
      const IndexD = state.findIndex((p) => p.id === action.id);
      state[IndexD].quantity -= 1;
      return [...state];
    default:
      return state;
  }
}
