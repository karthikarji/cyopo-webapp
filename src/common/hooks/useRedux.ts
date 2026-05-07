/**
 * Typed Redux hooks
 * Use these everywhere instead of plain useDispatch and useSelector
 * so TypeScript knows the full RootState shape.
 */

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@cyopo/Redux/store/ReduxStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
