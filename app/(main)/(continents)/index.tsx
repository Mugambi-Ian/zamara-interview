import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { Text, View } from '../../../components/view';

interface IContinent {
  code: string;
  name: string;
}

interface IContinentResponse {
  '?xml': string;
  'soap:Envelope': {
    'soap:Body': {
      'm:ListOfContinentsByNameResponse': {
        'm:ListOfContinentsByNameResult': {
          'm:tContinent': {
            'm:sCode': string;
            'm:sName': string;
          }[];
        };
      };
    };
  };
}

async function getContinents(): Promise<IContinent[]> {
  const url =
    'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';

  const response = await axios.post(
    url,
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
      <soapenv:Header/>
      <soapenv:Body>
        <web:ListOfContinentsByName/>
      </soapenv:Body>
    </soapenv:Envelope>`,
    {
      headers: {
        'Content-Type': 'text/xml',
      },
    },
  );

  const parser = new XMLParser();
  const continentResponse = parser.parse(response.data) as IContinentResponse;
  const continents =
    continentResponse['soap:Envelope']['soap:Body'][
      'm:ListOfContinentsByNameResponse'
    ]['m:ListOfContinentsByNameResult']['m:tContinent'];

  return continents.map(c => ({ code: c['m:sCode'], name: c['m:sName'] }));
}

function ContinentItem({ item: { code, name } }: { item: IContinent }) {
  return (
    <View className="ml-7 mr-10 flex-row rounded-lg bg-[#e0e0e0] py-2 dark:bg-[#2e2e2e]">
      <Text className="mx-6 font-app-light text-lg text-black dark:text-white">
        {code}
      </Text>
      <Text className="flex-1 font-app-medium text-lg text-black dark:text-white">
        {name}
      </Text>
    </View>
  );
}

function ContinentDivider() {
  return <View className="h-2" />;
}

export default function Continents() {
  const [refreshing, setRefreshing] = useState(true);
  const [data, setData] = useState<IContinent[]>([]);

  const loadData = useCallback(async () => {
    setRefreshing(true);
    const continents = await getContinents();
    setData(continents);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="mt-8 flex-1 justify-center">
      {refreshing ? <View /> : null}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ContinentDivider}
        renderItem={({ item }) => <ContinentItem item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
      />
    </View>
  );
}
