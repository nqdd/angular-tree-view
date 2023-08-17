export interface TreeNode {
    id: number,
    name: string,
    parentId?: number,
    children: Array<TreeNode>
}