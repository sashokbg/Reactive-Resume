import { css } from '@emotion/css';
import { Cake, Email, Phone, Public, Room } from '@mui/icons-material';
import { alpha } from '@mui/material';
import { ThemeConfig } from '@reactive-resume/schema';
import clsx from 'clsx';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import DataDisplay from '@/templates/shared/DataDisplay';
import { formatDateString } from '@/utils/date';
import getProfileIcon from '@/utils/getProfileIcon';
import { getContrastColor } from '@/utils/styles';
import { addHttp, formatLocation, getPhotoClassNames } from '@/utils/template';

export const MastheadSidebar: React.FC = () => {
  const dateFormat: string = useAppSelector((state) => get(state.resume.present, 'metadata.date.format'));
  const { name, headline, photo, email, phone, birthdate, website, location, profiles } = useAppSelector(
    (state) => state.resume.present.basics
  );
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {}));
  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);
  const iconColor = useMemo(() => (contrast === 'dark' ? theme.text : theme.background), [theme, contrast]);

  return (
    <div className="col-span-2 grid justify-items-start gap-3 p-4" style={{display: 'flex', justifyContent: 'center'}}>
      {photo.visible && !isEmpty(photo.url) && (
        <img
          alt={name}
          src={photo.url}
          width={photo.filters.size}
          height={photo.filters.size}
          className={getPhotoClassNames(photo.filters)}
        />
      )}

      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
        <h2 className="mb-1" style={{color: '#562AD5'}}>{name}</h2>
        <p className="opacity-75" style={{fontWeight: '600', fontSize: '14px', letterSpacing: '0.1rem'}}>{headline}</p>
      </div>

      <div className={clsx('flex flex-col gap-2.5', css(`svg { color: ${iconColor} }`))}>
        <DataDisplay icon={<Room />} className="!gap-2 text-xs">
          {formatLocation(location)}
        </DataDisplay>

        <DataDisplay icon={<Cake />} className="!gap-2 text-xs">
          {formatDateString(birthdate, dateFormat)}
        </DataDisplay>

        <DataDisplay icon={<Email />} className="!gap-2 text-xs" link={`mailto:${email}`}>
          {email}
        </DataDisplay>

        <DataDisplay icon={<Phone />} className="!gap-2 text-xs" link={`tel:${phone}`}>
          {phone}
        </DataDisplay>

        <DataDisplay icon={<Public />} link={website && addHttp(website)} className="!gap-2 text-xs">
          {website}
        </DataDisplay>

        {profiles.map(({ id, username, network, url }) => (
          <DataDisplay key={id} icon={getProfileIcon(network)} link={url && addHttp(url)} className="!gap-2 text-xs">
            {username}
          </DataDisplay>
        ))}
      </div>
    </div>
  );
};

export const MastheadMain: React.FC = () => {

  const { summary } = useAppSelector((state) => state.resume.present.basics);

  return (
    <div className="grid gap-2 p-4">
      <div>
        <div style={{height: '10px', width: '60px', backgroundColor: '#FFCC29', borderRadius: '2px'}}></div>
        <h4 style={{position: 'relative', bottom: '15px', left: '10px', color: '#562AD5'}}>ABOUT</h4>
      </div>
      <Markdown>{summary}</Markdown>
    </div>
  );
};
