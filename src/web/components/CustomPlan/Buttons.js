import React, { Component } from 'react'
import PC from './PC'
import PTable from './PTable'
import FormGeneratorModal from '../general/FormGeneratorModal'
import {loadBox} from '../../../utils/box'
import {clearFormGeneratorModal, } from '../../../utils/form'
import { language, ln, dir } from '../../../utils/language'
import { isUserInRole, getUserRole, ADMIN, } from '../../../utils/role'

export default class Buttons extends Component {
  render() {
    let {deleteLoading, addEditLoading, addEditSubLoading, action, subAction,
      editProps, addProps, category,
      titleName, productId,
      defaultProducts, userData,
      title, subTitle, id, parentId, handlers
    } = this.props
    if (defaultProducts) {
      parentId = defaultProducts
    }
    const loading = addEditLoading && (addEditLoading == id || addEditLoading == true)
    const subLoading = addEditSubLoading && (addEditSubLoading == id || addEditSubLoading == true)
    console.log('Buttons addEditLoading:', addEditLoading, addEditSubLoading, loading, subLoading, id, parentId);
    return (
      isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData) &&
        <div style={{marginBottom: 10}}>
          <button type="button" className="btn margin-btn btn-danger"
            data-toggle="modal" data-target={!deleteLoading && `.delete${action}${id}`}
            disabled={deleteLoading == id || deleteLoading == true}>
            {ln('delete')} {titleName}
            &nbsp;
            {deleteLoading == id || deleteLoading == true?
              <i className="fa fa-spin fa-circle-o-notch"></i>
              :
              <i className="fa fa-times"></i>
            }
          </button>
          <button type="button" className="btn margin-btn btn-success"
            data-toggle="modal" data-target={!addEditLoading && `.edit${action}${id}`}
            disabled={loading}>
            {ln('edit')} {titleName}
            &nbsp;
            {loading?
              <i className="fa fa-spin fa-circle-o-notch"></i>
              :
              <i className="fa fa-pencil"></i>
            }
          </button>
          {subAction &&
            <button type="button" className="btn margin-btn btn-primary"
              data-toggle="modal" data-target={!addEditSubLoading && `.add${subAction}${id}`}
              disabled={subLoading}>
              {ln('add')} {subTitle}
              &nbsp;
              {subLoading?
                <i className="fa fa-spin fa-circle-o-notch"></i>
                :
                <i className="fa fa-plus-circle"></i>
              }
            </button>
          }
          <FormGeneratorModal buttonText={`delete${title}`} iconName="times" innerForm={`delete${action}${id}`}
            innerText={`${ln('sureToDelete')} ${title} ${titleName}${ln('questionMark')}`}
            submitAction={handlers.delete} params={[id, productId, category]}
            />

          <FormGeneratorModal buttonText={`edit${title}`} iconName="pencil"
            formId={`edit${action}${id}`} innerForm={`addEdit${action}`}
            submitAction={handlers.addEdit} params={[id, parentId, productId, category]}
            {...editProps}
            />

          <FormGeneratorModal buttonText={`add${subTitle}`}
            iconName="plus" formId={`add${subAction}${id}`} innerForm={`addEdit${subAction}`}
            submitAction={handlers.subAddEdit} params={[null, id, productId, category]}
            {...addProps}
            />

        </div>
      
    )
  }
}
