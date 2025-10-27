import React from 'react';
import Markdown from 'react-markdown';

const CodeReView = ({ review }) => {
  return (
    <div className="h-[32rem] md:h-full overflow-y-auto px-4 py-3 rounded-md bg-gray-800 text-sm text-gray-200">
      <Markdown >
        {review}
      </Markdown>
    </div>
  );
};

export default CodeReView;
