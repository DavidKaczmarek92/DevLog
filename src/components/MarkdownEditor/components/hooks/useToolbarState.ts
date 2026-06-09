import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useReducer } from "react";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";

interface ToolbarState {
  canUndo: boolean;
  canRedo: boolean;
  isBold: boolean;
  isItalic: boolean;
  isCode: boolean;
}

type ToolbarAction =
  | { type: "UPDATE_CAN_UNDO"; payload: boolean }
  | { type: "UPDATE_CAN_REDO"; payload: boolean }
  | {
      type: "UPDATE_FORMATS";
      payload: { isBold: boolean; isItalic: boolean; isCode: boolean };
    };

const initialState: ToolbarState = {
  canUndo: false,
  canRedo: false,
  isBold: false,
  isItalic: false,
  isCode: false,
};

function reducer(state: ToolbarState, action: ToolbarAction): ToolbarState {
  switch (action.type) {
    case "UPDATE_CAN_UNDO":
      return { ...state, canUndo: action.payload };
    case "UPDATE_CAN_REDO":
      return { ...state, canRedo: action.payload };
    case "UPDATE_FORMATS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

const useToolbarState = () => {
  const [editor] = useLexicalComposerContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      dispatch({
        type: "UPDATE_FORMATS",
        payload: {
          isBold: selection.hasFormat("bold"),
          isItalic: selection.hasFormat("italic"),
          isCode: selection.hasFormat("code"),
        },
      });
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        1,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          dispatch({ type: "UPDATE_CAN_UNDO", payload });
          return false;
        },
        1,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          dispatch({ type: "UPDATE_CAN_REDO", payload });
          return false;
        },
        1,
      ),
    );
  }, [editor, updateToolbar]);

  return state;
};

export { useToolbarState };
export type { ToolbarState };
