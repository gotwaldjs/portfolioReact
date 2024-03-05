import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
    Grid, 
    Column,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem
} from '@carbon/react';
import './masters.scss';
import { CustomTimelineItem, TimelineContainer, TimelineItemNoSeperator } from '../../components/timeline/Timeline';
import { ProjectBanner } from '../../components/page_header/PageHeader';
import data from './masters.json';

const Masters = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const theme = useSelector(state => state.theme); // Access theme from Redux store

    const { welcomeMat, statusTrue, open } = data.project;

    return (
        <Grid condensed>
            <Column lg={16} md={8} sm={4}>
                <ProjectBanner 
                    welcomeMat={welcomeMat}
                    open={open}
                    statusTrue={statusTrue}/>
            </Column>
            <Column lg={16} md={8} sm={4} className="landing-page__r2">
                <Tabs defaultSelectedIndex={0}>
                    <TabList className="tabs-group" aria-label="Tab navigation">
                        <Tab style = {{ marginLeft:'54px'}}>Summary</Tab>
                        <Tab>Design</Tab>
                        <Tab>User Analytics</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Grid className="tabs-group-content">
                                <Column
                                    md={4}
                                    lg={3}
                                    sm={4}
                                    className="landing-page__tab-content">
                                    <SideNavItems>
                                        <SideNavMenu title="Project Walkthrough">
                                            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                                                Overview and Detils
                                            </SideNavMenuItem>
                                            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                                                The Ask
                                            </SideNavMenuItem>
                                            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                                                The Process
                                            </SideNavMenuItem>
                                        </SideNavMenu>
                                        <SideNavLink>
                                            Past Projects
                                        </SideNavLink>
                                        <SideNavLink>
                                            Contact Me
                                        </SideNavLink>
                                    </SideNavItems>
                                </Column>
                                <Column md={4} lg={{ span: 9, offset: 3 }} sm={4}>   
                                    <TimelineContainer>
                                    <CustomTimelineItem
                                        leftText="2016"
                                        rightTextHeader="Designer"
                                        rightTextBody="Track"
                                    />
                                    <CustomTimelineItem
                                        leftText="2017"
                                        rightTextHeader="Label"
                                        rightTextBody="Lorem ipsum dolor"
                                    />
                                    <CustomTimelineItem
                                        leftText="2018"
                                        rightTextHeader="Label"
                                        rightTextBody="Lorem ipsum dolor"
                                    />
                                    <CustomTimelineItem
                                        leftText="2019"
                                        rightTextHeader="Label"
                                        rightTextBody="Lorem ipsum dolor"
                                    />
                                    <CustomTimelineItem
                                        leftText="2020"
                                        rightTextHeader="Label"
                                        rightTextBody="Lorem ipsum dolor"
                                    />
                                    <CustomTimelineItem
                                        leftText="2021"
                                        rightTextHeader="Label"
                                        rightTextBody="Lorem ipsum dolor"
                                    />
                                    <CustomTimelineItem
                                        leftText="2022"
                                        rightTextHeader="Label"
                                        rightTextBody="Lorem ipsum dolor"
                                    />
                                    <TimelineItemNoSeperator
                                        leftText="2023"
                                        rightTextHeader="Label"
                                        rightTextBody="Lorem ipsum dolor"
                                    />
                                    </TimelineContainer>
                                </Column>
                            </Grid>
                        </TabPanel>
                        <TabPanel>
                            <Grid className="tabs-group-content">
                                <Column
                                lg={16}
                                md={8}
                                sm={4}
                                className="landing-page__tab-content">
                                Rapidly build beautiful and accessible experiences. The Carbon
                                kit contains all resources you need to get started.
                                </Column>
                            </Grid>
                            </TabPanel>
                            <TabPanel>
                            <Grid className="tabs-group-content">
                                <Column
                                lg={16}
                                md={8}
                                sm={4}
                                className="landing-page__tab-content">
                                Carbon provides styles and components in Vanilla, React,
                                Angular, and Vue for anyone building on the web.
                                </Column>
                            </Grid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
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

    export default Masters;
