import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const _ = require(`lodash`);

const Pager = ({ pager, route }) => {
  const {
    // pageNumber,
    humanPageNumber,
    // skip,
    // limit,
    numberOfPages,
    previousPagePath,
    nextPagePath
  } = pager;
  const PagerLink = ({ path, children }) => {
    return !path ? null : <Link to={path}>{children}</Link>;
  };
  PagerLink.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node
  };
  PagerLink.defaultProps = {
    children: null
  };
  const PagerSteps = () => {
    return !route ? null : (
      <div>
        {[...Array(numberOfPages).keys()].map(i => {
          const y = i + 1;

          return (
            <Link
              className={css`
                padding-right: 10px;
                hover: {
                  background-color: purple;
                  color: white;
                }
              `}
              to={`${route}/${y}`}
            >
              {y}
            </Link>
          );
        })}
      </div>
    );
  };

  return numberOfPages <= 1 ? null : (
    <>
      <h5>{` Page ${humanPageNumber} of ${numberOfPages} `}</h5>
      <PagerSteps route={route} />
      <PagerLink path={previousPagePath}>Previous </PagerLink>
      <PagerLink path={nextPagePath}>Next</PagerLink>
    </>
  );
};
Pager.propTypes = {
  pager: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.string
};
Pager.defaultProps = {
  route: null
};
export default Pager;
