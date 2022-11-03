import { css } from '@emotion/css';
import { ThemeConfig } from '@reactive-resume/schema';
import clsx from 'clsx';
import get from 'lodash/get';
import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { getContrastColor } from '@/utils/styles';
import { PageProps } from '@/utils/template';

import proxymLogoName from '../../public/images/proxym/proxym-logo-name.svg';
import proxymLogoNameBackground from '../../public/images/proxym/proxym-logo-name-background.svg';
import proxymLogoNoName from '../../public/images/proxym/proxym-logo-no-name.svg';
import { getSectionById } from '../sectionMap';
import styles from './Proxym.module.scss';
import { MastheadMain, MastheadSidebar } from './widgets/Masthead';
import Section from './widgets/Section';
import Timeline from "@/templates/Proxym/widgets/Timeline";


const Proxym: React.FC<PageProps> = ({ page }) => {
  const isFirstPage = useMemo(() => page === 0, [page]);

  const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {}));
  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);
  const color = useMemo(() => (contrast === 'dark' ? theme.text : theme.background), [theme, contrast]);

  return (
    <div className={styles.page} style={{padding: '5rem 1rem 2rem 0'}}>
      <img src={proxymLogoNoName.src} alt="image" style={{position: 'absolute', top: '10px', left: '90px'}}/>
      <img src={proxymLogoNameBackground.src} alt="image" style={{position: 'absolute', top: 0, right: '64px'}}/>
      <img src={proxymLogoName.src} alt="image" style={{position: 'absolute', top: '35px', right: '40px'}}/>
      <div className={styles.container}>
        {isFirstPage && <div className={styles.sidebar} >
          <Timeline key="timeline" />
          <div
            className={clsx(css(`svg { color: ${color} } --primary-color: ${color}`))}
          >
            <MastheadSidebar />
          </div>
          <div className={styles.inner}>
            {layout[1].map((key) => getSectionById(key, Section))}
          </div>

        </div>
        }
        <div className={styles.main}>
          <div className={styles.firstPage}>{isFirstPage && <MastheadMain />}</div>

          <div className={styles.inner}>{layout[0].map((key) => getSectionById(key, Section))}</div>
        </div>
      </div>
    </div>
  );
};

export default Proxym;
