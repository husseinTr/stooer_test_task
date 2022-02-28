
/**
 * Describes post object data
 */
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Describes comment object data
 */
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

/**
 * Describes dialog object data
 */
export interface DialogData {
  post?: Post;
  id?: number;
  operation: string;
}

/**
 * Defines the allowed values of the dialog operations
 */
 export const enum PostCreateUpdateDialogOperationValue {
  CREATE_POST = 'create',
  UPDATE_POST = 'update',
}
