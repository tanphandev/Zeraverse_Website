import { ISearchGame } from "@/interface/games/ISearchGame";

type Props = {
  searchResult: ISearchGame | null;
};
function SearchResult({ searchResult }: Props) {
  const { category, game, gameByCategory } = searchResult ?? {};
  return (
    <>
      {/* <NoData results={results} /> */}
      {/* list */}
      {/* <div
        className="search-grid modal-scroll absolute top-0 bottom-[-62px] py-[110px] max-w-[644px]
                   overflow-y-scroll overflow-x-hidden"
      >
        {category?.map((e, i) => (
          <GameCategory
            key={i}
            id={e?.id}
            label={e?.label}
            thumbnail={e?.thumbnail}
            slug={e?.slug}
            superslug={e?.superslug}
            style={{
              gridRowStart: "span 1",
              gridColumnStart: "span 2",
            }}
            className="max-h-[94px]"
            onClick={handleClose}
          />
        ))}
        {game?.concat(gameByCategory)?.map((e, i) => (
          <GameItem
            key={i}
            thumbnail={e?.thumbnail}
            title={e?.title}
            id={e?.id}
            slug={e?.slug}
            superslug={e?.superslug}
            className="h-[94px]"
            onClick={handleClose}
          />
        ))}
      </div> */}
      <h1>result</h1>
    </>
  );
}

export default SearchResult;
