import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as AWS from 'aws-sdk';

import { environment as env } from '../../../environments/environment';

AWS.config.setPromisesDependency(null);

interface KeyValue {
  [name: string]: any;
}

@Injectable()
export class AwsService {
  private dynamoDB: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDB = new AWS.DynamoDB.DocumentClient();
  }

  query<T>(tableName, filters: KeyValue, fields?: string): Observable<T[]> {
    const keyConditionExpression = Object.keys(filters)
      .map(k => `${k} = :${k}`)
      .join(' AND ');

    const attributes = {};

    Object.keys(filters).forEach(key => {
      attributes[`:${key}`] = filters[key];
    });

    const params = {
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: attributes,
    };

    if (fields) {
      params['ProjectionExpression'] = fields;
    }

    return Observable.fromPromise(this.dynamoDB.query(params).promise()).map(res => res.Items as any);
  }
}
