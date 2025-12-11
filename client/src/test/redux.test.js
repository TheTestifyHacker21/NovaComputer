import { describe, it, expect } from "vitest";
import productReducer from "../features/ProductSlice";
import userReducer from "../features/UserSlice";

describe("Redux Slice Initial Values", () => {

  it("ProductSlice should return initial state", () => {
    const initialState = productReducer(undefined, { type: "unknown" });

    expect(initialState.products).toEqual([]);
    expect(initialState.message).toBe("");
    expect(initialState.isLoading).toBe(false);
    expect(initialState.isSuccess).toBe(false);
    expect(initialState.isError).toBe(false);
  });


  it("UserSlice should return initial state", () => {
    const initialState = userReducer(undefined, { type: "unknown" });

    expect(initialState.user).toEqual({});
    expect(initialState.message).toBe("");
    expect(initialState.isLoading).toBe(false);
    expect(initialState.isSuccess).toBe(false);
    expect(initialState.isError).toBe(false);
    expect(initialState.errorCount).toBe(0);
    expect(initialState.isLogedin).toBe(false);
    expect(initialState.timerId).toBeNull();
    expect(initialState.enableBtn).toBe(false);
  });
});
