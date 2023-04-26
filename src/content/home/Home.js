import React from 'react';
import { 
    Grid, 
    Column,
} from '@carbon/react';
import { CardTwoTags, CardThreeTags, CardFourTags} from '../../components/card/Card';
import masCardHolderImage from '../../media/hs/mas_card_holder.png';
import espnThumb from '../../media/hs/espn_card_001.png';


import './home-page.scss';

const Home = () => {
  return (
      <Grid fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
            <h1 className="landing-page__heading">
                Hello! 
            </h1>
            <p className="landing-page__banner_roles_heading">
                I am currently open for consulting in the following roles:
            </p>
            <p className="landing-page__banner_roles">
                UX Design, UI Design, Information Architiecture, and User Analysis.
            </p>
        </Column>
        <Column lg={{ span: 4, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__cards">
            <CardFourTags
            title="Card Title"
            description="Roles"
            imageSrc={masCardHolderImage}
            ctaText="View Project"
            ctaLink="#"
            backgroundColor='card-bg-color'
            tag1={{ type: 'gray', label: 'UXD' }}
            tag2={{ type: 'gray', label: 'UID' }}
            tag3={{ type: 'gray', label: 'User Metrics' }}
            tag4={{ type: 'gray', label: 'Onsite Support' }}
        />
        </Column>
        <Column lg={{ span: 4, offset: 0 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__cards">
            <CardFourTags
            title="Card Title"
            description="Roles"
            imageSrc={masCardHolderImage}
            ctaText="View Project"
            ctaLink="#"
            backgroundColor='card-bg-color'
            tag1={{ type: 'blue', label: 'Current' }}
            tag2={{ type: 'gray', label: 'UXD' }}
            tag3={{ type: 'gray', label: 'UID' }}
            tag4={{ type: 'gray', label: 'User Metrics Lead' }}
        />
        </Column>
        <Column lg={{ span: 4, offset: 0 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__cards">
            <CardThreeTags
            title="Card Title"
            description="Roles"
            imageSrc={espnThumb}
            ctaText="View Project"
            ctaLink="#"
            backgroundColor='card-bg-color'
            tag1={{ type: 'gray', label: 'UX Lead' }}
            tag2={{ type: 'gray', label: 'UI Lead' }}
            tag3={{ type: 'gray', label: 'User Metrics Lead' }}
        />
        </Column>
        <Column lg={{ span: 4, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__row2-cards">
            <CardTwoTags
            title="Card Title"
            description="Roles"
            imageSrc={masCardHolderImage}
            ctaText="View Project"
            ctaLink="#"
            backgroundColor='card-bg-color'
            tag1={{ type: 'gray', label: 'UX Lead' }}
            tag2={{ type: 'gray', label: 'User Metrics Lead' }}
        />
        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__footer">
            <p className="footer__caption">
                "We must all do what we must do, for if we do not, then what we must do does not get done"
            </p>
            <p className="footer__caption_source">
                Chung Mee - Volunteers
            </p>
            <p className="footer__copyright">
                Copyright © 2023, Gebaut von JEFF
            </p>
        </Column>
      </Grid>
      

  );
}

export default Home;
