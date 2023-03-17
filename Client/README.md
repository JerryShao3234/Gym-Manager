# Frontend guide

## How to build something

**Note:** you can refer to `src/components/Users` as a guide. I've commented stuff there to help you figure out what's going on. 

1. Build your backend stuff, test your route, etc. 

2. In `src/util/rest.ts`, make something like:

   ```TypeScript
    export async function getSomething(): Promise<TableEntry[]> {}
   ```
   The `getUsers()` function can serve as a reference.\
   Add the prefix of `post`/`get`/`put`/`delete` as per your discrepancy.

3. Make a new folder under `src/components` with your feature's name,
then rename `Users` in `Users.tsx`.
   ```TypeScript
   export function Users() {}
   ```  
   **Note:** There are other steps in that section, but don't follow them yet.
   Let's focus on making it show up first (in step 4). 

4. Go to `src/App.tsx` and complete the 2 steps listed.
   _At this point, if your light-blue tab is still empty and you don't know why, ping me (Noreen) to help you debug._
5. Go back to the folder you created in step 3, then follow the comments in `src/components/Users`.
   There are 5 steps I think you'll have to do.

## Folders

1. `src/components`: for JSX / "stuff you render".
   - Files end in `.tsx` or `.scss`, except for `index.ts`.
   - `./common`: Reusable components, such as `Table.tsx`.


2. `src/util`: for non-JSX stuff, namely sending API requests.
   - Files end in `.ts`.
   - `./rest.ts`: Where your calls to the backend goes.


3. Other folders
   - `public`: don't worry about this

## FAQ

Q: I added custom CSS, but it isn't showing up.\
A: Remember to import your SCSS file. 

