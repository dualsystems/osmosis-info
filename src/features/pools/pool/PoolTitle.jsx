import { IconButton, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Image from "../../../components/image/Image";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Tooltip from "@material-ui/core/Tooltip";
import { useWatchlistPools } from "../../../contexts/WatchlistPoolsProvider";
import { getInclude } from "../../../helpers/helpers";

const useStyles = makeStyles((theme) => {
  return {
    image: {
      width: "30px",
      marginRight: theme.spacing(1),
    },

    poolImage: {
      width: "40px",
      [theme.breakpoints.down("xs")]: {
        width: "30px",
      },
    },
    poolName: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        width: "90%",
      },
    },
    subTitle: {
      [theme.breakpoints.down("xs")]: {
        width: "90%",
      },
      fontSize: theme.fontSize.big,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    titleIcon: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        display: "grid",
        gridTemplateColumns: "1fr 30px",
      },
    },
    images: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    iconStar: {
      color: "rgba(196, 164, 106,1)",
    },
  };
});

const PoolTitle = ({ pool, tokens }) => {
  const classes = useStyles();
  const { watchlistPools, setWatchlistPools } = useWatchlistPools();
  const matchMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const toggleWatchlist = () => {
    let tmpWatchListPools = [...watchlistPools];
    let index = getInclude(watchlistPools, (plId) => plId === pool.id);
    if (index === -1) tmpWatchListPools.push(pool.id);
    else tmpWatchListPools.splice(index, 1);
    setWatchlistPools([...tmpWatchListPools]);
  };

  const isInWatchList = () => {
    let index = getInclude(watchlistPools, (plId) => {
      return plId === pool.id;
    });
    return index >= 0;
  };

  return (
    <div className={classes.poolName}>
      <div className={classes.images}>
        {tokens.map((token, index) => {
          return (
            <Image
              key={`${token.denom} - poolImage`}
              style={
                matchMD ? { transform: `translateX(-${index * 10}%)` } : { transform: `translateX(-${index * 75}%)` }
              }
              className={`${classes.image} ${classes.poolImage}`}
              assets={true}
              src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${token.symbol.toLowerCase()}.png`}
              srcFallback="../assets/default.png"
              pathAssets=""
              alt={`${token.symbol}`}
            />
          );
        })}
      </div>
      <div className={classes.titleIcon}>
        <p
          style={matchMD ? { transform: `translateX(0)` } : { transform: `translateX(-${tokens.length * 20}px)` }}
          className={classes.subTitle}
        >{`#${pool.id} ${pool.name}`}</p>

        <Tooltip
          style={matchMD ? { transform: `translateX(0)` } : { transform: `translateX(-${tokens.length * 20}px)` }}
          title={isInWatchList() ? "Remove from your watchlist" : "Add to your watchlist"}
        >
          <IconButton onClick={toggleWatchlist} aria-label="Switch in your watchList" component="span">
            {isInWatchList() ? (
              <StarIcon className={classes.iconStar} />
            ) : (
              <StarBorderIcon className={classes.iconStar} />
            )}
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default PoolTitle;
