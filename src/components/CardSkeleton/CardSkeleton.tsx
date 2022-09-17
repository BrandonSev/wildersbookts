import ContentLoader from "react-content-loader";

function CardSkeleton({ item = 3 }) {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: item }).map((_, index) => {
        return (
          <ContentLoader
            viewBox="0 0 500 420"
            height={420}
            width={446}
            foregroundOpacity={1}
            backgroundOpacity={1}
            key={index}
          >
            <rect x="0" y="17" rx="0" ry="0" width="446" height="200" />
            <rect x="0" y="229" rx="2" ry="2" width="275" height="15" />
            <rect x="0" y="253" rx="2" ry="2" width="140" height="15" />
            <rect x="0" y="300" rx="2" ry="2" width="50" height="15" />
            <rect x="0" y="350" rx="2" ry="2" width="75" height="15" />
            <rect x="100" y="350" rx="2" ry="2" width="90" height="15" />
          </ContentLoader>
        );
      })}
    </div>
  );
}

export default CardSkeleton;
