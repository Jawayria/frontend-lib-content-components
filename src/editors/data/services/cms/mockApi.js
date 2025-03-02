/* istanbul ignore file */

import * as urls from './urls';

const mockPromise = (returnValue) => new Promise(resolve => resolve(returnValue));

// TODO: update to return block data appropriate per block ID, which will equal block type
// eslint-disable-next-line
export const fetchBlockById = ({ blockId, studioEndpointUrl }) => mockPromise({
  data: {
    data: '<p>Test prompt content</p>',
    display_name: 'My Text Prompt',
  },
});

// TODO: update to return block data appropriate per block ID, which will equal block type
// eslint-disable-next-line
export const fetchByUnitId = ({ blockId, studioEndpointUrl }) => mockPromise({
  data: { ancestors: [{ id: 'unitUrl' }] },
});
// eslint-disable-next-line
export const fetchImages = ({ courseId, studioEndpointUrl }) => mockPromise({
  data: {
    assets: [
      {
        displayName: 'shahrukh.jpg',
        contentType: 'image/jpeg',
        dateAdded: 'Jan 05, 2022 at 17:38 UTC',
        url: '/asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
        externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
        portableUrl: '/static/shahrukh.jpg',
        thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@shahrukh.jpg',
        locked: false,
        id: 'asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
      },
      {
        displayName: 'IMG_5899.jpg',
        contentType: 'image/jpeg',
        dateAdded: 'Nov 16, 2021 at 18:55 UTC',
        url: '/asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
        externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
        portableUrl: '/static/IMG_5899.jpg',
        thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@IMG_5899.jpg',
        locked: false,
        id: 'asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
      },
      {
        displayName: 'ccexample.srt',
        contentType: 'application/octet-stream',
        dateAdded: 'Nov 01, 2021 at 15:42 UTC',
        url: '/asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
        externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
        portableUrl: '/static/ccexample.srt',
        thumbnail: null,
        locked: false,
        id: 'asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
      },
      {
        displayName: 'Tennis Ball.jpeg',
        contentType: 'image/jpeg',
        dateAdded: 'Aug 04, 2021 at 16:52 UTC',
        url: '/asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
        externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
        portableUrl: '/static/Tennis_Ball.jpeg',
        thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@Tennis_Ball-jpeg.jpg',
        locked: false,
        id: 'asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
      },
    ],
  },
});

export const normalizeContent = ({
  blockId,
  blockType,
  content,
  courseId,
  title,
}) => {
  if (blockType === 'html') {
    return {
      category: blockType,
      couseKey: courseId,
      data: content,
      has_changes: true,
      id: blockId,
      metadata: { display_name: title },
    };
  }
  throw new TypeError(`No Block in V2 Editors named /"${blockType}/", Cannot Save Content.`);
};

export const saveBlock = ({
  blockId,
  blockType,
  content,
  courseId,
  studioEndpointUrl,
  title,
}) => mockPromise({
  url: urls.block({ studioEndpointUrl, blockId }),
  content: normalizeContent({
    blockType,
    content,
    blockId,
    courseId,
    title,
  }),
});

export const uploadImage = ({
  courseId,
  studioEndpointUrl,
  // image,
}) => mockPromise({
  url: urls.courseAssets({ studioEndpointUrl, courseId }),
  image: {
    asset: {
      display_name: 'journey_escape.jpg',
      content_type: 'image/jpeg',
      date_added: 'Jan 05, 2022 at 21:26 UTC',
      url: '/asset-v1:edX+test101+2021_T1+type@asset+block@journey_escape.jpg',
      external_url: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@journey_escape.jpg',
      portable_url: '/static/journey_escape.jpg',
      thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@journey_escape.jpg',
      locked: false,
      id: 'asset-v1:edX+test101+2021_T1+type@asset+block@journey_escape.jpg',
    },
    msg: 'Upload completed',
  },
});
