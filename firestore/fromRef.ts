/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO figure out what is wrong with the types...
import { Observable } from 'rxjs';
import { firestore } from 'firebase-admin';


/* eslint-disable @typescript-eslint/no-explicit-any */
export function fromRef<T = firestore.DocumentData>(ref: firestore.DocumentReference): Observable<firestore.DocumentSnapshot<T>>;
export function fromRef<T = firestore.DocumentData>(ref: firestore.Query<T>): Observable<firestore.QuerySnapshot<T>>;
export function fromRef(
  ref: any,
): Observable<any> {
  /* eslint-enable @typescript-eslint/no-explicit-any */
  return new Observable(subscriber => {
    const unsubscribe = ref.onSnapshot(
      subscriber.next.bind(subscriber),
      subscriber.error.bind(subscriber),
    );
    return { unsubscribe };
  });
}
