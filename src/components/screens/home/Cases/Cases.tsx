import { FC } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

import casesData from '@data/cases.json';
import ICases from '@shared/interfaces/Cases/ICases';

import Button from '@components/ui/Button/Button';

import styles from './Cases.module.scss';

const getSwiperOptions = (row: number) => {
    return {
        modules: [Autoplay],
        slidesPerView: 3,
        spaceBetween: 50,
        allowTouchMove: false,
        speed: 10000,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: row % 2 !== 0 ? true : false
        }
    }
}

const Cases: FC = () => {
    const {sectionTitle, button, image, images}: ICases = casesData;
    
    const rowsArray = [];
    for(let i = 0; i < images.rows; i++) rowsArray.push(i + 1);

    return (
        <section className={styles.section} id="cases">
            <div className="container">
                <div className={styles.section_row}>
                    <h2 className={styles.section_title}>{sectionTitle}</h2>
                    <Button type="link" href={button.link} text={button.text} className="theme_ghost" customClass={styles.button} />
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.images}>
                    {rowsArray.map((row, index) => {
                        const items = images.items.filter(item => item.row === row);
                        return (
                            <div className={styles.row} key={index}>
                                <Swiper {...getSwiperOptions(row)}>
                                    {items.map(({name, row}, index) => (
                                        <SwiperSlide key={index}>
                                            <div className={styles.image}>
                                                <Image src={image.url + name} 
                                                       blurDataURL={image.url + name} 
                                                       alt={image.alt} 
                                                       placeholder="blur" 
                                                       layout="fill" 
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Button type="link" href={button.link} text={button.text} className="theme_ghost" customClass={styles.button_mobile} />
        </section>
    );
}

export default Cases;