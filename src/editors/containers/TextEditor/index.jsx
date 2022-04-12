import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

import 'tinymce';
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/icons/default';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';

import {
  Spinner,
  Stack,
  Toast,
} from '@edx/paragon';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import { actions, selectors } from '../../data/redux';
import { RequestKeys } from '../../data/constants/requests';
import ImageUploadModal from './components/ImageUploadModal';
import EditorFooter from './components/EditorFooter';
import EditorHeader from './components/EditorHeader';

import * as hooks from './hooks';
import messages from './messages';

export const TextEditor = ({
  // redux
  blockValue,
  lmsEndpointUrl,
  blockFailed,
  blockFinished,
  initializeEditor,
  // inject
  intl,
}) => {
  const { editorRef, refReady, setEditorRef } = hooks.prepareEditorRef();
  const { isOpen, openModal, closeModal } = hooks.modalToggle();
  const imageSelection = hooks.selectedImage(null);

  if (!refReady) { return null; }

  return (
    <Stack>
      <EditorHeader editorRef={editorRef} />

      <div className="editor-body h-75 overflow-auto">
        <ImageUploadModal
          isOpen={isOpen}
          close={closeModal}
          editorRef={editorRef}
          {...imageSelection}
        />

        <Toast show={blockFailed} onClose={hooks.nullMethod}>
          <FormattedMessage {...messages.couldNotLoadTextContext} />
        </Toast>

        {(!blockFinished)
          ? (
            <div className="text-center p-6">
              <Spinner
                animation="border"
                className="m-3"
                screenreadertext={intl.formatMessage(messages.spinnerScreenReaderText)}
              />
            </div>
          )
          : (
            <Editor
              {...hooks.editorConfig({
                setEditorRef,
                blockValue,
                openModal,
                initializeEditor,
                lmsEndpointUrl,
                setSelection: imageSelection.setSelection,
                clearSelection: imageSelection.clearSelection,
              })}
            />
          )}
      </div>

      <EditorFooter editorRef={editorRef} />
    </Stack>
  );
};
TextEditor.defaultProps = {
  blockValue: null,
  lmsEndpointUrl: null,
};
TextEditor.propTypes = {
  // redux
  blockValue: PropTypes.shape({
    data: PropTypes.shape({ data: PropTypes.string }),
  }),
  lmsEndpointUrl: PropTypes.string,
  blockFailed: PropTypes.bool.isRequired,
  blockFinished: PropTypes.bool.isRequired,
  initializeEditor: PropTypes.func.isRequired,
  // inject
  intl: intlShape.isRequired,
};

export const mapStateToProps = (state) => ({
  blockValue: selectors.app.blockValue(state),
  lmsEndpointUrl: selectors.app.lmsEndpointUrl(state),
  blockFailed: selectors.requests.isFailed(state, { requestKey: RequestKeys.fetchBlock }),
  blockFinished: selectors.requests.isFinished(state, { requestKey: RequestKeys.fetchBlock }),
});

export const mapDispatchToProps = {
  initializeEditor: actions.app.initializeEditor,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TextEditor));
