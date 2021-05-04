import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "../ListItem/ListItem";

const useStyles = makeStyles((theme) => ({
  sublist: {
    paddingLeft: theme.spacing(3),
  },
}));

function ListUl({ items, isRoot }) {
  const classes = useStyles();
  const css = isRoot ? "" : classes.sublist;
  const keys = Object.keys(items);
  /** */
  return (
    <List className={css}>
      {keys.map((key, index) => (
        <ListItem key={index} item={items[key]}>
          {Object.keys(items[key].children).length ? (
            <ListUl items={items[key].children} />
          ) : null}
        </ListItem>
      ))}
    </List>
  );
}

export default ListUl;
