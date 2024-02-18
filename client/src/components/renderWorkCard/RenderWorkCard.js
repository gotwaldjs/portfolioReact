import { CardTwoTags,
    CardThreeTags, 
    CardFourTags,
    CardFiveTags
    } from '../../components/card/Card';

const renderWorkCard = (workItem, isLoggedIn, handleCardClick) => {
  const tagComponents = [CardTwoTags, CardThreeTags, CardFourTags, CardFiveTags];
  const CardComponent = tagComponents[workItem.tags.length - 2];

  if (CardComponent) {
      return (
          <CardComponent
              title={workItem.timeOnProject}
              description="My Roles"
              imageSrc={workItem.image}
              ctaLink={workItem.ctaLink}
              backgroundColor='card-bg-color'
              isPrivate={!isLoggedIn && workItem.private} // Modify based on login status
              currentProj={workItem.incomplete}
              onCardClick={() => handleCardClick(workItem)}
              {...workItem.tags.reduce((acc, tag, index) => {
                  acc[`tag${index + 1}`] = { type: 'gray', label: tag };
                  return acc;
              }, {})}
          />
      );
  }

  return null; // Or some default component if the tags count is outside 2-4
};
  
  
export default renderWorkCard;