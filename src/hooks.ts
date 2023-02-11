import {AppDispatch, RootState} from './redux/store';
import {useDispatch, useSelector} from 'react-redux';

import {TypedUseSelectorHook} from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
