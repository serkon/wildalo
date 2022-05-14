import React, { useEffect, useState } from 'react';
import './carousel.component.scss';

/**
 * Carousel component
 * @param {Object} props
 * @param {string} props.className
 * @param {string} props.id
 *
 * Usage example:
 *
 * <Carousel>
 *   {roadmap.map((item, index) => (
 *     <CarouselItem key={index}>
 *       <Heading fontSize="42px" pb="32px" color="white">
 *         {item.title}
 *       </Heading>
 *       <Box>
 *         {item.description.map((description, index) => (
 *           <Text key={index} fontSize="14px" color="white">
 *             {description}
 *           </Text>
 *         ))}
 *       </Box>
 *     </CarouselItem>
 *   ))}
 * </Carousel>
 */

interface Props {
  id?: string;
  children?: React.ReactNode;
  className?: string;
  maxWidth?: string;
  margin?: string;
}

const getRandomID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const Carousel = (props: React.PropsWithChildren<Props>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const handleClick = (index: number) => {
    index <= items.length - 1 ? (index < 0 ? setCurrentIndex(items.length - 1) : setCurrentIndex(index)) : setCurrentIndex(0);
  };

  useEffect(() => {
    console.log(currentIndex);
    (contentRef.current as HTMLDivElement).style.transform = `translate(${-100 * currentIndex}%)`;
  }, [currentIndex]);

  useEffect(() => {
    setItems(() => Array.from(props.children as Array<React.ReactNode>));
  }, [props.children]);

  return (
    <>
      <div
        className={`${props.className ? `carousel ${props.className}` : 'carousel'}`}
        id={props.id ? props.id : getRandomID()}
        style={{ maxWidth: props.maxWidth || 'auto', margin: props.margin || 'auto' }}
      >
        <div className="carousel-container">
          <div className="carousel-content" ref={contentRef}>
            {props.children}
          </div>
          <div className="carousel-nav-dot">
            {items.map((_item, key) => (
              <div className={`${currentIndex === key ? 'carousel-nav-item active' : 'carousel-nav-item'}`} onClick={() => handleClick(key)} key={key} />
            ))}
          </div>
          <div className="carousel-nav-arrow">
            <button className="carousel-nav-arrow-left" onClick={() => handleClick(currentIndex - 1)} />
            <button className="carousel-nav-arrow-right" onClick={() => handleClick(currentIndex + 1)} />
          </div>
        </div>
      </div>
    </>
  );
};

interface CarouselItemProps {
  className?: string;
}

export const CarouselItem = (props: React.PropsWithChildren<CarouselItemProps>) => (
  <>
    <div className={`${props.className ? `carousel-item ${props.className}` : 'carousel-item'}`}>{props.children}</div>
  </>
);
