import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Image from '../Image';
import './styles.scss';

const Teaser = props => {
  const { title, image, path, alt } = props;
  return (
    <article className="teaser">
      <h3 className="teaser--title">
        <Link to={path}>{title}</Link>
      </h3>
      <Link to={path}>
        <Image fixed={image} alt={alt} />
      </Link>
    </article>
  );
};
Teaser.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  image: PropTypes.objectOf(PropTypes.any),
  alt: PropTypes.string
};

Teaser.defaultProps = {
  path: null,
  alt: 'Image',
  image: null
};
export default Teaser;
