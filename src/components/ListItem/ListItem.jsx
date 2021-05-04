import {
  Checkbox,
  Collapse,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useContext, useState } from "react";
import TreeContext from "./../../context/CheckTree";

function ListItemLi({ children, item }) {
  const checkTree = useContext(TreeContext);
  const check = checkTree.data[item.id] ?? false;
  const [open, setOpen] = useState(false);
  const isRoot = !!Object.keys(item.children).length;
  const onCheck = () => {
    checkTree.onCheck(item.id);
    /* istanbul ignore else */
    if (isRoot) {
      const checkAllChildrens = (childrens) => {
        for (const iterator in childrens) {
          checkTree.onCheck(childrens[iterator].id, !check);
          checkAllChildrens(childrens[iterator].children);
        }
      };
      checkAllChildrens(item.children);
    }
  };
  const onExpand = () => setOpen((o) => !o);
  const verifyCheck = () => {
    let qt = 0;
    let qtM = 0;
    const verifyAllChildrens = (childrens) => {
      for (const iterator in childrens) {
        const item = childrens[iterator];
        qt++;
        if (checkTree.data[item.id]) {
          qtM++;
        }
        verifyAllChildrens(item.children);
      }
    };
    verifyAllChildrens(item.children);
    /***/
    return {
      indeterminate: qt > 0 && qtM > 0 && qt > qtM,
      check: qt > 0 && qt === qtM,
    };
  };
  const { indeterminate, check: rootCheck } = verifyCheck();
  /***/
  return (
    <>
      <ListItem button onClick={onCheck}>
        <ListItemIcon>
          {isRoot ? (
            <Checkbox
              indeterminate={indeterminate}
              checked={rootCheck || indeterminate}
              name="checkedB"
              color="primary"
            />
          ) : (
            <Checkbox
              indeterminate={indeterminate}
              checked={check}
              name="checkedB"
              color="primary"
            />
          )}
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {children ? (
          <ListItemSecondaryAction onClick={onExpand}>
            <IconButton edge="end" aria-label="delete">
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        ) : null}
      </ListItem>
      {children ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      ) : null}
    </>
  );
}

export default ListItemLi;
