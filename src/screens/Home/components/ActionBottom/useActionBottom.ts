import {navigationRef} from '@src/AppContainer';
import {ADD_LIST_SCREEN, ADD_TASK_SCREEN} from '@constants/screenKeys';

const useActionBottom = () => {
  const gotoAddTask = () => {
    navigationRef.navigate(ADD_TASK_SCREEN as never);
  };

  const gotoAddList = () => {
    navigationRef.navigate(ADD_LIST_SCREEN as never);
  };
  return {
    gotoAddTask,
    gotoAddList,
  };
};

export default useActionBottom;
